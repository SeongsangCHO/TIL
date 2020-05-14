/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 18:27:17 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 13:56:25 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

int main(void)
{
	t_list *list;

	initList(list);
	print_list(list);
	printf("*** add_node_n ***\n");
	add_node_pre_tail(list, 1); //1
	add_node_pre_tail(list, 2); //12
	add_node_pre_tail(list, 3); //123
	add_node_next_head(list,4); //4123
	print_list(list);
	printf("*** add_node_n ***\n");

	printf("*** edit_node_n ***\n");
	edit_node_n(list, 1, 0); //0123 - 4 -> 1
	print_list(list);
	edit_node_data(list, 3, 8); //0128 - 3 -> 8
	print_list(list);
	printf("*** edit_node_n ***\n");
	
	printf("*** search & edit _node_n ***\n");
	printf("[1] node data is = %d\n",search_node_n(list, 1)->data);
	printf("[2] node data is = %d\n",search_node_n(list, 2)->data);
	printf("[3] node data is = %d\n",search_node_n(list, 3)->data);
	printf("[4] node data is = %d\n",search_node_n(list, 4)->data);
	
	printf("*** search & edit _node_n ***\n");
	
	printf("*** search & edit _node_data return is last node ***\n");
	printf("%d\n",search_node_data(list, 0)->data);
	printf("%d\n",search_node_data(list, 1)->data);
	printf("%d\n",search_node_data(list, 2)->data);
	printf("%d\n",search_node_data(list, 8)->data);
	printf("*** search & edit _node_data return is last node***\n");


	printf("*** delete_node_n ***\n");
	delete_node_n(list, 1); //0 is deleted // 128
	print_list(list);
	delete_node_n(list, 3); // 8 is deleted // 12
	print_list(list);
	delete_node_n(list, 2); // 2 is deleted // 1
	print_list(list);
	printf("*** delete_node_n ***\n");
	
	
	add_node_pre_tail(list, 2); //12
	print_list(list);

	printf("*** delete_all ***\n");
	delete_all(list);
	print_list(list);
	printf("*** delete_all ***\n");
	return (0);
}
