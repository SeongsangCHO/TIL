/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 17:19:06 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 19:58:02 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

int main(void)
{
	t_list *list;

	list = create_list(list);
	add_node(list, 0, 0);
	add_node(list, 1, 8);
	add_node(list, 2, 3);
	add_node(list, 3, 4);
	add_node(list, 4, 5);
	print_node(list);
	search_node_data(list, 8);
	add_node(list, search_node_data(list, 5), 6);
	print_node(list);
	delete_node(list, 0);
	print_node(list);
	delete_all(list);
	print_node(list);
	add_node(list, 0, 1);
	add_node(list, 1, 2);
	add_node(list, 2, 3);
	add_node(list, 3, 4);
	print_node(list);
	edit_node(list, 3, 6);
	print_node(list);
}
