/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 20:30:46 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 20:31:34 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

t_node		*create_node(int data)
{
	t_node	*new;
	
	if (!(new = malloc(sizeof(t_node))))
		return (NULL);
	new->data = data;
	new->next = NULL;
	return (new);
}
