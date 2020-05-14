/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit_node.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 16:13:41 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 16:16:55 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void	edit_node(t_node **head, t_node *edited, int data)
{
	if (head == 0 || edited == 0)
		return ;
	edited->data = data;
	return ;
}
